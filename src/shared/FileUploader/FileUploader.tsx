import React, { ChangeEvent, memo, useEffect } from 'react';
import cn from 'clsx';
import { Text } from '../../components/Forms/TextField/Text';
import { PicWrapper } from '../PicWrapper/PicWrapper';
import { useUploadFileMutation } from './api/uploaderApi';
import s from './FileUploader.module.scss';

interface FileUploaderProps {
  title?: string;
  pic?: string;
  picProportion?: string;
  disabled?: boolean;
  onUpload: (url: string) => void;
  className?: string;
}

export const FileUploader = memo(
  ({ title = 'Изображение', pic, picProportion = '1/1', disabled, onUpload, className }: FileUploaderProps) => {
    const [uploadFile, { data, isLoading, error }] = useUploadFileMutation();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (isLoading || !e.target.files) return;
      const [file] = e.target.files;
      uploadFile(file);
    };

    useEffect(() => {
      if (!data) return;
      onUpload(data);
    }, [data, onUpload]);

    return (
      <div className={cn(s.outer, className, { [s.outer_disabled]: isLoading || disabled })}>
        <Text weight="bold" className={s.title}>
          {title}
        </Text>
        <div className={s.picOuter} style={{ aspectRatio: picProportion }}>
          <PicWrapper className={s.pic} pic={data || pic} />
          <label className={s.edit}>
            Загрузить Картинку
            <input className={s.input} type="file" onChange={handleChange} />
          </label>
        </div>
        {error && <Text>{error as string}</Text>}
      </div>
    );
  }
);

FileUploader.displayName = 'FileUploader';

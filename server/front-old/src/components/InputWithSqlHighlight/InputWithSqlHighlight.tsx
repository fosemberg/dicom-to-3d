import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism-dark.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const InputWithSqlHighlight: React.FC<Props> = (
  {
    value,
    onChange,
    placeholder,
  }
) => {
  return (
    <Editor
      className="editor form-control"
      textareaId={'id'}
      value={value}
      defaultValue={''}
      onValueChange={onChange}
      highlight={code => highlight(code, languages.sql, 'sql')}
      padding={6}
      textareaClassName={'form-control'}
      placeholder={placeholder}
    />
  );
};

export default InputWithSqlHighlight;

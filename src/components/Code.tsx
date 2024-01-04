"use client";

import { useTheme } from "next-themes";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import { useEffect, useState } from "react";

const Code = ({
  code,
  show,
  animated,
  language,
}: {
  code: string;
  show: boolean;
  animated?: boolean;
  language: Language;
}) => {
  const { theme: applicationTheme } = useTheme();
  const [text, setText] = useState<string>(animated ? "" : code);

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i++;
          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, 40);
    }
  }, [code, show, animated]);

  const theme = applicationTheme === "light" ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} code={text} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`${className} overflow-x-auto`} style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              <span className="select-none text-gray-500 mr-4">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default Code;

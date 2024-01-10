"use client";

import { useTheme } from "next-themes";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";
import { useEffect, useState } from "react";
import styles from './Code.module.css'; // Import a CSS module for custom styles
import { Button } from "./ui/button";

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
  const [isFullCodeShown, setIsFullCodeShown] = useState<boolean>(!show);
  const theme = applicationTheme === "light" ? lightTheme : darkTheme;
  
  const codeLines = text.split('\n');
  const visibleLines = isFullCodeShown ? codeLines : codeLines.slice(0, 20);
  const isGradientShown = !isFullCodeShown && codeLines.length > 20;

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      const intervalId = setInterval(() => {
        setText(code.slice(0, i));
        i++;
        if (i > code.length) {
          clearInterval(intervalId);
        }
      }, 15);
      return () => clearInterval(intervalId);
    }
  }, [code, show, animated]);

  

  return (
    <>
      <Highlight {...defaultProps} code={visibleLines.join('\n')} language={language} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} overflow-x-auto custom-scrollbar relative`} style={style}>
            {isGradientShown && <div className={styles.gradientOverlay} />}
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
      {codeLines.length > 20 && (
        <Button
          variant="sexyNightWolf"
          className="mt-4 px-4 py-2 rounded"
          onClick={() => setIsFullCodeShown(!isFullCodeShown)}
        >
          {isFullCodeShown ? 'Show Less' : 'Show More'}
        </Button>
      )}
    </>
  );
};

export default Code;

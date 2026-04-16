import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './PostBody.css';

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="code-copy" onClick={handleCopy} title="Copy code">
      {copied ? (
        <>
          <i className="fas fa-check"></i> Copied
        </>
      ) : (
        <i className="far fa-copy"></i>
      )}
    </button>
  );
};

const PostBody = ({ content }) => {
  return (
    <div className="post-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            return !inline && match ? (
              <div className="code-block">
                <div className="code-block-header">
                  <span className="code-lang">{match[1]}</span>
                  <CopyButton text={codeString} />
                </div>
                <SyntaxHighlighter
                  {...props}
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  className="code-block-body"
                  showLineNumbers={codeString.split('\n').length > 3}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className="inline-code" {...props}>
                {children}
              </code>
            );
          },
          h2: ({ children }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-');
            return <h2 id={id}>{children}</h2>;
          },
          h3: ({ children }) => {
            const text = String(children);
            const id = text
              .toLowerCase()
              .replace(/[^a-z0-9\s-]/g, '')
              .replace(/\s+/g, '-');
            return <h3 id={id}>{children}</h3>;
          },
          img: ({ src, alt }) => (
            <figure className="post-figure">
              <img src={src} alt={alt || ''} loading="lazy" />
              {alt && <figcaption>{alt}</figcaption>}
            </figure>
          ),
          blockquote: ({ children }) => (
            <blockquote className="post-quote">{children}</blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="table-wrapper">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
};

PostBody.propTypes = {
  content: PropTypes.string.isRequired,
};

export default PostBody;

import { useEffect, useId, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import mermaid from 'mermaid';
import { trackEvent } from '../../utils/analytics.js';
import {
  getUrlHost,
  isAffiliateUrl,
  isExternalUrl,
  markdownLikelyHasAffiliateLinks,
} from '../../utils/linkAttribution.js';
import './PostBody.css';

mermaid.initialize({
  startOnLoad: false,
  securityLevel: 'strict',
  theme: 'dark',
});

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

const toPlainText = (value) => {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(toPlainText).join('');
  if (value?.props?.children) return toPlainText(value.props.children);
  return '';
};

const slugify = (text) =>
  String(text)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

const normalizeImageSrc = (value) => {
  if (!value) return '';

  const src = String(value).trim();
  if (/^(https?:|data:|blob:)/i.test(src)) return src;

  let normalized = src
    .replace(/^\.\/+/, '')
    .replace(/^public\//, '')
    .replace(/^\/public\//, '/');

  if (!normalized.startsWith('/')) {
    normalized = `/${normalized}`;
  }

  return normalized;
};

const MermaidBlock = ({ chart }) => {
  const id = useId();
  const containerId = `mermaid-${id.replace(/:/g, '')}`;

  useEffect(() => {
    let active = true;

    const render = async () => {
      const target = document.getElementById(containerId);
      if (!target) return;

      try {
        const { svg } = await mermaid.render(containerId, chart);
        if (active) target.innerHTML = svg;
      } catch {
        if (active) target.textContent = chart;
      }
    };

    render();

    return () => {
      active = false;
    };
  }, [chart, containerId]);

  return <div id={containerId} className="mermaid-block" />;
};

MermaidBlock.propTypes = {
  chart: PropTypes.string.isRequired,
};

const Callout = ({ type = 'note', children }) => (
  <aside className={`callout callout-${type}`}>{children}</aside>
);

Callout.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};

const PostBody = ({ content, postSlug }) => {
  const hasAffiliateDisclosure = markdownLikelyHasAffiliateLinks(content);

  return (
    <div className="post-body">
      {hasAffiliateDisclosure && (
        <aside
          className="affiliate-disclosure"
          aria-label="Affiliate disclosure"
        >
          Disclosure: Some links in this post may be affiliate links. If you use
          them, I may earn a commission at no extra cost to you.
        </aside>
      )}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeString = String(children).replace(/\n$/, '');

            if (!inline && match?.[1] === 'mermaid') {
              return <MermaidBlock chart={codeString} />;
            }

            return !inline && match ? (
              <div className="code-block">
                <div className="code-block-header">
                  <span className="code-lang">{match[1]}</span>
                  <CopyButton text={codeString} />
                </div>
                <pre className="code-block-body" {...props}>
                  <code className={`language-${match[1]}`}>{codeString}</code>
                </pre>
              </div>
            ) : (
              <code className="inline-code" {...props}>
                {children}
              </code>
            );
          },
          h2: ({ children }) => (
            <h2 id={slugify(toPlainText(children))}>{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 id={slugify(toPlainText(children))}>{children}</h3>
          ),
          h4: ({ children }) => (
            <h4 id={slugify(toPlainText(children))}>{children}</h4>
          ),
          img: ({ src, alt, title }) => {
            const caption = title?.trim();

            return (
              <figure className="post-figure">
                <img
                  className="post-md-image"
                  src={normalizeImageSrc(src)}
                  alt={alt || ''}
                  loading="lazy"
                  decoding="async"
                />
                {caption && <figcaption>{caption}</figcaption>}
              </figure>
            );
          },
          blockquote: ({ children }) => {
            const text = toPlainText(children).trim();
            const calloutMatch = text.match(
              /^\[!(NOTE|TIP|WARNING|DANGER)\]\s*/i,
            );

            if (calloutMatch) {
              const type = calloutMatch[1].toLowerCase();
              const body = text.replace(
                /^\[!(NOTE|TIP|WARNING|DANGER)\]\s*/i,
                '',
              );
              return <Callout type={type}>{body}</Callout>;
            }

            return <blockquote className="post-quote">{children}</blockquote>;
          },
          a: ({ href, children }) => {
            const external = isExternalUrl(href);
            const affiliate = isAffiliateUrl(href);

            const onTrackedClick = () => {
              if (!external) return;
              trackEvent(
                affiliate ? 'affiliate_link_click' : 'outbound_link_click',
                {
                  href,
                  host: getUrlHost(href),
                  post_slug: postSlug,
                },
              );
            };

            if (!external) {
              return <a href={href}>{children}</a>;
            }

            if (affiliate) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  onClick={onTrackedClick}
                >
                  {children}
                </a>
              );
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onTrackedClick}
              >
                {children}
              </a>
            );
          },
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
  postSlug: PropTypes.string,
};

export default PostBody;

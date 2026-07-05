import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
import { useAnchorTargetClassName } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { useLocation } from '@docusaurus/router';
import type { Props } from '@theme/Heading';
import './styles.module.css';
import CopyPageButton from '@site/src/components/CopyPageButton';
import DownloadPdfButton from '@site/src/components/DownloadPdfButton';

export default function Heading({ as: As, id, ...props }: Props): ReactNode {
  const brokenLinks = useBrokenLinks();
  const anchorTargetClassName = useAnchorTargetClassName(id);
  const { pathname } = useLocation();
  // Generated-index landing pages (/part-N and their sub-category slugs) are
  // auto-built navigation grids with no authored prose — suppress the
  // "Copy page for LLM" button there; keep it on real content pages.
  const isGeneratedIndex = /\/part-\d/.test(pathname);
  // The 24 command/event API-reference pages (single segment under a group).
  // NOTE: useLocation().pathname INCLUDES the site baseUrl, so these are substring
  // (not ^-anchored) matches.
  const isApiRefPage = /\/reference\/(mgmt|ctrl|events|data)\/[^/]+\/?$/.test(pathname);
  // The API-reference index page (gets the consolidated "full" PDF).
  const isApiOverview = /\/reference\/api-overview\/?$/.test(pathname);

  // H1 headings do not need an id because they don't appear in the TOC.
  if (As === 'h1' || !id) {
    return (
      <>
        {As === 'h1' ? (
          <div className="custom-h1-wrapper">
            <As {...props} id={undefined} />
            {!isGeneratedIndex && (
              <div className="h1-actions">
                {isApiRefPage && <DownloadPdfButton kind="page" />}
                {isApiOverview && <DownloadPdfButton kind="full" />}
                <CopyPageButton />
              </div>
            )}
          </div>
        ) : (
          <As {...props} id={undefined} />
        )}
      </>
    );
  }

  brokenLinks.collectAnchor(id);

  const anchorTitle = translate(
    {
      id: 'theme.common.headingLinkTitle',
      message: 'Direct link to {heading}',
      description: 'Title for link to heading',
    },
    {
      heading: typeof props.children === 'string' ? props.children : id,
    },
  );

  return (
    <As
      {...props}
      className={clsx('anchor', anchorTargetClassName, props.className)}
      id={id}>
      {props.children}
      <Link
        className="hash-link"
        to={`#${id}`}
        aria-label={anchorTitle}
        title={anchorTitle}
        translate="no">
        &#8203;
      </Link>
    </As>
  );
}

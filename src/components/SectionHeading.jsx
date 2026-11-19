export function SectionHeading({
  darkText,
  mutedText,
  as: Tag = 'h2',
  className = '',
}) {
  return (
    <Tag className={`section-heading ${className}`.trim()}>
      <span className="section-heading__dark">{darkText}</span>{' '}
      {mutedText ? (
        <span className="section-heading__muted">{mutedText}</span>
      ) : null}
    </Tag>
  );
}

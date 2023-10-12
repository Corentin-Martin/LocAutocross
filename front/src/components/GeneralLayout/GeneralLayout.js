import { useEffect } from 'react';
import './GeneralLayout.scss';

function GeneralLayout({
  childComponent, title, pageTitle, description,
}) {
  useEffect(() => {
    document.title = `Loc'Autocross - ${pageTitle ?? ''}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description !== null) {
      metaDescription.setAttribute('content', `Loc'Autocross - ${description}`);
    }
  }, [title, description]);

  return (
    <div className="GeneralLayout">
      {title !== null && <h1>{title}</h1>}
      {childComponent}
    </div>
  );
}

GeneralLayout.defaultProps = {
  title: null,
  pageTitle: null,
  description: null,
};

export default GeneralLayout;

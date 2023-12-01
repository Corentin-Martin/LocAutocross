import { useEffect } from 'react';
import './GeneralLayout.scss';

function GeneralLayout({
  childComponent, title, pageTitle, description, image,
}) {
  useEffect(() => {
    document.title = `Loc'Autocross - ${pageTitle ?? ''}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    const metaDescriptionSocial = document.querySelector('meta[property="og:description"]');
    const metaTitleSocial = document.querySelector('meta[property="og:title"]');
    if (metaDescription && description !== null) {
      metaDescription.setAttribute('content', `Loc'Autocross - ${description}`);
    }

    if (metaDescriptionSocial && description !== null) {
      metaDescriptionSocial.setAttribute('content', `Loc'Autocross - ${description}`);
    }

    if (metaTitleSocial && pageTitle !== null) {
      metaTitleSocial.setAttribute('content', `Loc'Autocross - ${pageTitle}`);
    }

    if (image !== null) {
      const metaImageSocial = document.querySelector('meta[property="og:image"]');
      metaImageSocial.setAttribute('content', `${process.env.REACT_APP_API_URL}${image}`);
    }
    else {
      const metaImageSocial = document.querySelector('meta[property="og:image"]');
      metaImageSocial.setAttribute('content', 'https://api.locautocross.fr/images/banniere.png');
    }
  }, [title, description, image, pageTitle]);

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
  image: null,
};

export default GeneralLayout;

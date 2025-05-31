import React from 'react';
import { Helmet } from 'react-helmet-async';

type SeoProps = {
    title: string;
    description?: string;
    image?: string;
};

export const Seo: React.FC<SeoProps> = ({ title, description, image }) => {
    return (
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            {image && <meta property="og:image" content={image} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description || ''} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};
'use client';
import { LightsaberIcon, PortalIcon, StorefrontIcon, DocumentIcon } from './ProjectIcons';

export default function ProjectIconRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case 'lightsaber-core':           return <LightsaberIcon />;
    case 'school-admission-portal':   return <PortalIcon />;
    case 'lunelle-ecommerce':         return <StorefrontIcon />;
    case 'online-course-architectures': return <DocumentIcon />;
    default:                          return <DocumentIcon />;
  }
}

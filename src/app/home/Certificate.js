import { client } from '@/app/api/contentful';
import CertificateList from './CertificateList';


export default async function Certificate() {
  let certificateItems = [];
  try {
    const res = await client.getEntries({
      content_type: 'certificate',
      order: 'sys.createdAt',
    });
    certificateItems = res.items || [];
  } catch (error) {
    console.error('Error fetching news:', error);
  }


  return <CertificateList certificateItems={certificateItems} />;
}
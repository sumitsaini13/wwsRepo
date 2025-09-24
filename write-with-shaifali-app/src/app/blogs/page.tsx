import Link from 'next/link';
import Publications from '../../components/Publications'
import InterviewCards from '@/components/InterviewCards';
import RotatingSubtitle from '@/components/RotatingSubtitles';
import BlogItems from '@/components/BlogItems';

export default function Blogs() {
  return (
    <div>
     <Publications />
     <RotatingSubtitle />
     <InterviewCards />
     <BlogItems/>
    </div>
    
  );
}
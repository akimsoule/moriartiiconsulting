import { Linkedin } from 'lucide-react';
import { TeamMember as TeamMemberType } from '@/lib/data';
import CustomLink from '../CustomLink';

interface TeamMemberProps {
  member: TeamMemberType;
}

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="h-80 relative">
        <img 
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover"
        />
        {member.linkedin && (
          <div className="absolute top-4 right-4">
            <CustomLink 
              href={member.linkedin}
              className="bg-white p-2 rounded-full shadow-md text-moriartii-primary hover:text-moriartii-secondary transition-colors duration-300"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn de ${member.name}`}
            >
              <Linkedin className="h-5 w-5" />
            </CustomLink>
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-moriartii-primary mb-1">
          {member.name}
        </h3>
        
        <p className="text-moriartii-secondary font-medium mb-4">
          {member.role}
        </p>
        
        <p className="text-gray-700">
          {member.bio.length > 150 ? `${member.bio.substring(0, 150)}...` : member.bio}
        </p>
      </div>
    </div>
  );
}
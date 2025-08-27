import Link from "next/link";
import './PersonCard.css';

const PersonCard = ({ person, link }) => (
    <Link href={link} className="person-card-link group">
        <div className="person-card">
            <div className="person-card-background"></div>
            <div className="person-card-content">
                <div className="person-card-image-wrapper">
                    <img src={person.image} alt={person.name} className="person-card-image" />
                </div>
                <div className="person-card-info">
                    <h3 className="person-card-name">{person.name}</h3>
                    <p className="person-card-role">{person.role} @{person.company}</p>
                    {person.communityRole && (
                        <p className="person-card-community-role">{person.communityRole}</p>
                    )}
                </div>
            </div>
        </div>
    </Link>
);

export default PersonCard;

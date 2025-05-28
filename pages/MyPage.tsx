
import React from 'react';
import { UserData } from '../types';
import { Settings, ShieldCheck, BarChart2, ChevronRight, UserCircle2 } from 'lucide-react';

interface MyPageProps {
  user: UserData;
}

interface ListItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const ProfileListItem: React.FC<ListItemProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full p-4 bg-zinc-800 hover:bg-zinc-700/70 rounded-lg transition-colors duration-150 ease-in-out"
      aria-label={label}
    >
      <div className="flex items-center">
        <Icon size={22} className="text-teal-400 mr-4" />
        <span className="text-slate-100 font-medium">{label}</span>
      </div>
      <ChevronRight size={20} className="text-slate-500" />
    </button>
  );
};

const MyPage: React.FC<MyPageProps> = ({ user }) => {
  return (
    <div className="flex flex-col h-full bg-zinc-900 text-slate-100">
      {/* Header / Profile Info */}
      <div className="pt-12 pb-8 px-4 flex flex-col items-center bg-gradient-to-b from-zinc-800 to-zinc-900">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={`${user.name}'s avatar`}
            className="w-28 h-28 rounded-full object-cover border-4 border-teal-500 shadow-lg mb-4"
          />
        ) : (
          <div className="w-28 h-28 rounded-full bg-zinc-700 flex items-center justify-center border-4 border-teal-500 shadow-lg mb-4">
            <UserCircle2 size={60} className="text-teal-300" />
          </div>
        )}
        <h1 className="text-2xl font-bold text-slate-100">{user.name}</h1>
        <p className="text-sm text-slate-400">Keep going, you're doing great!</p>
      </div>

      {/* Menu List */}
      <div className="flex-grow overflow-y-auto p-4 space-y-3 pb-20">
        <ProfileListItem icon={BarChart2} label="My Activity Stats" onClick={() => console.log('Navigate to Activity Stats')} />
        <ProfileListItem icon={ShieldCheck} label="Achievements" onClick={() => console.log('Navigate to Achievements')} />
        <ProfileListItem icon={Settings} label="Settings" onClick={() => console.log('Navigate to Settings')} />
        {/* Add more list items as needed */}
        {/* e.g., Workout History, Personal Records, Connected Apps, Help & Support, Logout */}
         <div className="pt-4">
             <ProfileListItem icon={UserCircle2} label="Edit Profile" onClick={() => console.log('Navigate to Edit Profile')} />
         </div>
      </div>
    </div>
  );
};

export default MyPage;

import React, { useState } from 'react';
import { Users, MessageSquare, Trophy, Calendar, Zap, BookOpen, Award, TrendingUp } from 'lucide-react';
import { PageType } from '../App';

interface CommunityPageProps {
  onNavigate: (page: PageType) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('groups');

  const groups = [
    {
      id: '1',
      name: 'Science Fiction Writers',
      description: 'For writers exploring the future, space, and technology',
      members: 2847,
      posts: 1234,
      image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isJoined: true
    },
    {
      id: '2',
      name: 'Fantasy Realm',
      description: 'Magic, dragons, and epic adventures await',
      members: 3291,
      posts: 2156,
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isJoined: false
    },
    {
      id: '3',
      name: 'Romance Writers Circle',
      description: 'Love stories that capture the heart',
      members: 1876,
      posts: 892,
      image: 'https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      isJoined: true
    }
  ];

  const challenges = [
    {
      id: '1',
      title: 'NaNoWriMo 2024',
      description: 'Write 50,000 words in November',
      participants: 1247,
      daysLeft: 15,
      prize: 'Exclusive Badge + Featured Story',
      difficulty: 'Hard',
      status: 'Active'
    },
    {
      id: '2',
      title: 'Flash Fiction Friday',
      description: 'Weekly 500-word story challenge',
      participants: 892,
      daysLeft: 3,
      prize: 'Winner\'s Circle Badge',
      difficulty: 'Medium',
      status: 'Active'
    },
    {
      id: '3',
      title: 'Character Development Workshop',
      description: 'Create compelling characters in 7 days',
      participants: 567,
      daysLeft: 8,
      prize: 'Character Master Badge',
      difficulty: 'Easy',
      status: 'Active'
    }
  ];

  const events = [
    {
      id: '1',
      title: 'Writing Sprint Session',
      date: 'Today, 7:00 PM',
      attendees: 45,
      type: 'Virtual',
      host: 'Sarah Johnson'
    },
    {
      id: '2',
      title: 'Guest Author AMA: J.K. Rowling',
      date: 'Tomorrow, 3:00 PM',
      attendees: 1247,
      type: 'Live Stream',
      host: 'PageTurner Team'
    },
    {
      id: '3',
      title: 'Beta Reading Workshop',
      date: 'Dec 15, 2:00 PM',
      attendees: 234,
      type: 'Virtual',
      host: 'Mike Chen'
    }
  ];

  const tabs = [
    { id: 'groups', label: 'Groups', icon: Users },
    { id: 'challenges', label: 'Challenges', icon: Trophy },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Writing Community</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Connect with fellow writers, join challenges, and grow your craft together
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">12,459</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Members</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">47</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active Challenges</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">156</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Events This Month</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center border border-gray-200 dark:border-gray-700">
          <MessageSquare className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900 dark:text-white">8,924</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Discussions</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex space-x-1 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'groups' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group) => (
              <div key={group.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <img
                  src={group.image}
                  alt={group.name}
                  className="w-full h-32 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{group.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">{group.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <span>{group.members.toLocaleString()} members</span>
                    <span>{group.posts} posts</span>
                  </div>
                  <button
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                      group.isJoined
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {group.isJoined ? 'Joined' : 'Join Group'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'challenges' && (
          <div className="space-y-6">
            {challenges.map((challenge) => (
              <div key={challenge.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{challenge.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        challenge.difficulty === 'Hard' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                        challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {challenge.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{challenge.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {challenge.participants} participants
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {challenge.daysLeft} days left
                      </div>
                      <div className="flex items-center">
                        <Award className="h-4 w-4 mr-1" />
                        {challenge.prize}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Join Challenge
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'events' && (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {event.date}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {event.attendees} attending
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs">
                        {event.type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Hosted by {event.host}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Join Event
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
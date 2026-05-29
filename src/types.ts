export interface ProfileData {
  name: string;
  avatarUrl: string;
  bannerUrl: string;
  bioAr: string;
  bioEn: string;
  discordTag: string;
  twitterHandle: string;
  youtubeChannel: string;
  tiktokHandle: string;
  kickHandle: string;
  customStatusAr: string;
  customStatusEn: string;
  
  // Custom platform logo/icon overrides (can be url or emoji)
  twitterIconUrl?: string;
  discordIconUrl?: string;
  youtubeIconUrl?: string;
  tiktokIconUrl?: string;
  kickIconUrl?: string;

  // Real-time Grand Theft Auto RP Characters list
  gtaCharacters?: GtaCharacter[];
}

export interface GtaCharacter {
  id: string;
  nameAr: string;
  nameEn: string;
  nicknameAr: string;
  nicknameEn: string;
  serverAr: string;
  serverEn: string;
  roleAr: string;
  roleEn: string;
  storyAr: string;
  storyEn: string;
  imageUrl?: string;
  statusAr: string;
  statusEn: string;
  strength: number;  // 0-100
  shooting: number;  // 0-100
  driving: number;   // 0-100
  stealth: number;   // 0-100
}

export type ActiveLanguage = 'ar' | 'en';

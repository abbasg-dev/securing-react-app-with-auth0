import { useState, useEffect } from 'react';
import type { Auth0UserProfile } from 'auth0-js';
import auth from './Auth/Auth';

export default function Profile() {
  const [profile, setProfile] = useState<Auth0UserProfile | null>(null);

  useEffect(() => {
    auth.getProfile((profile) => setProfile(profile ?? null));
  }, []);

  if (!profile) return null;

  return (
    <>
      <h1>Profile</h1>
      <p>{profile.nickname}</p>
      <img
        style={{ maxWidth: 50, maxHeight: 50 }}
        src={profile.picture}
        alt="profile pic"
      />
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </>
  );
}

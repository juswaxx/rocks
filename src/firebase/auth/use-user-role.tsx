'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '../provider';
import { useUser } from './use-user';

type UserRole = 'admin' | 'user' | null;

export function useUserRole() {
  const { user, loading: userLoading } = useUser();
  const db = useFirestore();
  const [role, setRole] = useState<UserRole>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadRole() {
      if (userLoading) return;

      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const snapshot = await getDoc(doc(db, 'users', user.uid));
        const userRole = snapshot.data()?.role === 'admin' ? 'admin' : 'user';

        if (!cancelled) {
          setRole(userRole);
        }
      } catch {
        if (!cancelled) {
          setRole('user');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadRole();

    return () => {
      cancelled = true;
    };
  }, [db, user, userLoading]);

  return { role, isAdmin: role === 'admin', loading: userLoading || loading };
}

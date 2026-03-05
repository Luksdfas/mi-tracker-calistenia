import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Auth } from './components/auth';
import CalisteniaTrackerPro from './components/CalisteniaTracker';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Si no configuraste Supabase, no hacemos nada con la sesión
    if (!isSupabaseConfigured()) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    if (isSupabaseConfigured()) {
      await supabase.auth.signOut();
    }
  };

  // CASO A: No hay credenciales en .env.local (Modo Local)
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="bg-yellow-100 text-yellow-800 p-2 text-center text-sm font-medium">
          ⚠️ Modo Local: Configura Supabase en tu archivo .env.local para guardar datos en la nube.
        </div>
        <CalisteniaTrackerPro />
      </div>
    );
  }

  // CASO B: Supabase está configurado (Modo Nube)
  return (
    <div className="min-h-screen bg-gray-100 relative">
      {!session ? (
        <Auth />
      ) : (
        <>
          <button 
            onClick={handleSignOut}
            className="absolute top-4 right-4 z-50 bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors shadow-sm"
          >
            Cerrar sesión
          </button>
          
          <CalisteniaTrackerPro />
        </>
      )}
    </div>
  );
}

export default App;
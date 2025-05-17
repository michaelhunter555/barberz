import { useState, useEffect } from 'react';
import { router, usePathname } from 'expo-router';
import useAuth from './auth/use-auth'; 

function AuthGuard({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const [isRouterReady, setIsRouterReady] = useState(false);

  // Make sure the router is ready before attempting navigation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRouterReady(true);
    }, 0); // Ensures it's after mount

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isRouterReady && !auth?.userAuth === null && pathname !== "/login") {
      router.replace('/login'); 
    }
  }, [isRouterReady,pathname, auth?.userAuth]);

  useEffect(() => {
    console.log('Router ready:', isRouterReady);
    console.log('User auth:', auth?.userAuth);
    console.log('Pathname:', pathname);
  
    if (isRouterReady && !auth?.userAuth && pathname !== '/login') {
      console.log('Redirecting to /login');
    }
  }, [isRouterReady, auth?.userAuth, pathname]);
  

  if (!isRouterReady || (!auth?.userAuth && pathname !== '/login')) return null;

  return <>{children}</>;
}

const withAuthGuard = (Component: React.ComponentType) => {
    return function WrappedComponent(props: any) {
      return (
        <AuthGuard>
          <Component {...props} />
        </AuthGuard>
      );
    };
  };

  export default withAuthGuard;

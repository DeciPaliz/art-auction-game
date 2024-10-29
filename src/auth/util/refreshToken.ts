import { ConfigService } from 'src/config/config.service';

export const extractRefreshToken = (cookie: string) => {
  const cookies = cookie.split('; ');
  if (cookies.length === 0) return null;

  const refreshTokenCookie = cookies.find((cookie) =>
    cookie.startsWith(`${ConfigService.cookie.refresh.name}=`),
  );
  if (!refreshTokenCookie) return null;

  return refreshTokenCookie.split('=')[1];
};

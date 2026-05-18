import trSite from '@/messages/site/tr.json';
import trAdmin from '@/messages/admin/tr.json';

type SiteDictionary = typeof trSite;
type AdminDictionary = typeof trAdmin;

export type GlobalDictionary = {
  site: SiteDictionary;
  admin: AdminDictionary;
};

export type Namespace = keyof GlobalDictionary;

export type TxKey = 
  | `site.${keyof SiteDictionary}`
  | `admin.${keyof AdminDictionary}`;

export type TranslateFn = (key: TxKey, params?: Record<string, string | number>) => string;
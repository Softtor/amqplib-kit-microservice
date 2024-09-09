/**
 * To JSON usage with sequelize Model[] or Model in Data;
 */
export default function <Data extends { get(options: any): any }>(
  list: Data[] | Data
): any[] {
  if (!list) {
    return null;
  }
  if (Array.isArray(list)) {
    return list.map((item) => {
      return item.get({ plain: true });
    });
  }

  return list.get({ plain: true });
}

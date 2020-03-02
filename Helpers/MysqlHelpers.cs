using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace VP_API_Core.Helpers
{
    public static class MysqlHelpers
    {
        public static bool FillList<T>(this MySqlCommand cmd, ref List<T> list, T defaultValue = default(T))
        {
            using (var reader = cmd.ExecuteReader())
            {
                if (!reader.HasRows)
                    return false;

                if(list == null)
                    list = new List<T>();

                while (reader.Read())
                {
                    list.Add((T)Activator.CreateInstance(typeof(T), reader));
                }
            }
            return true;
        }
    }
}

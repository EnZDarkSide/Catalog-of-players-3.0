using MySql.Data.MySqlClient;
using System;
using System.Globalization;

namespace Catalog_of_players
{
    public class Player
    {
        public string Id { get; set; }
        public string firstName {get; set;}
        public string lastName {get; set;}
        public string sex {get; set;}
        public string dateOfBirth { get { return DateTime.Parse(date).ToString("yyyy-MM-dd"); } set { date = value; } }
        public string team {get; set;}
        public string country {get; set;}

        protected string date;
        public Player() { }

        // получение данных из БД
        public Player(MySqlDataReader reader) : base()
        {
            Id = reader.GetString("id");
            firstName = reader.GetString("firstname");
            lastName = reader.GetString("lastname");
            sex = reader.GetString("sex");
            dateOfBirth = DateTime.Parse(reader.GetString("dateofbirth")).ToString("dd.MM.yyyy");
            team = reader.GetString("team");
            country = reader.GetString("country");
        }
    }
}

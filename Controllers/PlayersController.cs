using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Data;
using MySql.Data.MySqlClient;
using VP_API_Core.Helpers;
using System.Linq;
using System;

namespace Catalog_of_players.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayersController : Controller
    {
        private readonly ILogger<PlayersController> _logger;

        private string[] Countries = { "Россия", "США", "Италия" };
        public string[] Sexes = {"Мужской", "Женский", "Другой" };

        List<string> teams = new List<string>();

        MySqlConnection connection = new MySqlConnection(@"server=127.0.0.1;uid=root;pwd=root;database=catalogofplayers;charset=cp1251");


        public PlayersController(ILogger<PlayersController> logger)
        {
            _logger = logger;
            if(connection.State == ConnectionState.Open)
            {
                connection.Close();
            }
            connection.Open();
        }

        [HttpGet, Route("getPlayers")]
        public ActionResult GetPlayers()
        {
            var players = new List<Player>();
            var sqlCmd = "SELECT * FROM players";
            var cmd = new MySqlCommand(sqlCmd, connection);
            cmd.FillList(ref players);
            
            return Json(players);
        }

        [HttpGet, Route("getTeams")]
        public ActionResult GetTeams()
        {
            var teams = new List<string>();
            var sqlCmd = "SELECT team FROM players";
            var cmd = new MySqlCommand(sqlCmd, connection);

            using (var reader = cmd.ExecuteReader())
            {
                if (!reader.HasRows)
                    return null;

                while (reader.Read())
                {
                    teams.Add(reader.GetString("team"));
                }
            }

            var result = teams.GroupBy(team => team).Select(x => x.Key).ToList();

            return Json(result);
        }


        [HttpPost, Route("addPlayer")]
        public string AddPlayer([FromBody]Player player)
        {
            if (!Countries.Contains(player.country) || !Sexes.Contains(player.sex))
                throw new Exception("Ошибка ввода данных");
            try
            {
                var modelProperties = typeof(Player).GetProperties().Where(prop => prop.Name != "Id");

                var columns = string.Join(",", modelProperties.Where(prop => prop.GetValue(player) != null).Select(w => $"`{w.Name}`"));
                var values = string.Join(",", modelProperties.Where(prop => prop.GetValue(player) != null).Select(prop => $"@{prop.Name}"));

                var sqlCmd = $"Insert into players (Id, {columns}) values (NULL, {values})";
                var cmd = new MySqlCommand(sqlCmd, connection);

                foreach (System.Reflection.PropertyInfo prop in modelProperties)
                {
                    if (prop.GetValue(player) != null)
                        cmd.Parameters.AddWithValue($"@{prop.Name}", prop.GetValue(player));
                }

                cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                //return "Не удалось выполнить операцию";
                return e.Message;
            }

            return "Success";
        }

        [HttpPost, Route("editPlayer")]
        public string EditPlayer([FromBody]Player player)
        {
            if(!Countries.Contains(player.country) || !Sexes.Contains(player.sex))
                throw new Exception("Ошибка ввода данных");
            try
            {
                var modelProperties = typeof(Player).GetProperties().Where(prop => prop.Name != "Id");

                //Получение пары вида `column`=@value
                var columns = string.Join(",", modelProperties.Where(prop => prop.GetValue(player) != null).Select(prop => $"`{prop.Name}`=@{prop.Name}"));

                var sqlCmd = $"Update players SET {columns} WHERE Id=@Id";
                var cmd = new MySqlCommand(sqlCmd, connection);

                foreach (System.Reflection.PropertyInfo prop in modelProperties)
                {
                    if (prop.GetValue(player) != null)
                        cmd.Parameters.AddWithValue($"@{prop.Name}", prop.GetValue(player));
                }
                cmd.Parameters.AddWithValue($"@Id", player.Id);

                cmd.ExecuteNonQuery();
            }
            catch (Exception e)
            {
                //return "Не удалось выполнить операцию";
                return e.Message;
            }

            return "Success";
        }
    }
}

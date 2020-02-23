using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Catalog_of_players.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlayersController : ControllerBase
    {
        private readonly ILogger<PlayersController> _logger;

        public string[] Teams = { "Барселона", "Аргентина" };

        public PlayersController(ILogger<PlayersController> logger)
        {
            _logger = logger;
        }

        [HttpGet, Route("getPlayers")]
        public IEnumerable<Players> GetPlayers()
        {
            return null;
        }

        [HttpGet, Route("getTeams")]
        public IEnumerable<string> GetTeams()
        {
            return Teams;
        }


    }
}

using BlockchainDemo.Classe;
using BlockchainDemo.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading;

namespace BlockchainDemo.Controllers
{
    public class HomeController : Controller
    {
        static List<Block> listBlockchain = new List<Block>();
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Hash()
        {
            return View();
        }


        public IActionResult Block()
        {
            Block bloco = new Block
            {
                BlockIndex = 1
            };
            bloco = Blockchain.Minerar(bloco);
            return View(bloco);
        }


        public IActionResult GenerateBlockchain()
        {
            listBlockchain = new List<Block>();
            Block bloco = new Block
            {
                BlockIndex = 1,
                PreviousHash = new string('0', 64)
            };
            bloco = Blockchain.Minerar(bloco);
            listBlockchain.Add(bloco);
            return View();
        }


        public JsonResult InvalidarBlockchain(int idList, Block block)
        {
            listBlockchain[idList].Nonce = block.Nonce;
            if (string.IsNullOrEmpty(block.Data)) block.Data = "";
            listBlockchain[idList].Data = block.Data;
            listBlockchain[idList].BlockIndex = block.BlockIndex;
            string hash = "";
            string texto = "";
            while (idList <= listBlockchain.Count - 1)
            {
                listBlockchain[idList].IsValid = false;
                texto = listBlockchain[idList].BlockIndex.ToString() + listBlockchain[idList].Data;
                hash = Blockchain.GerarCodigoHash(texto);
                listBlockchain[idList].Hash = hash;
                if (idList > 0)
                {
                    listBlockchain[idList].PreviousHash = listBlockchain[idList - 1].Hash;
                }
                idList = idList + 1;
            }
            return Json(listBlockchain);
        }

        public JsonResult RemoverUltimoBlockChain()
        {
            int ind = listBlockchain.Count;
            if ((ind -1) > 0)
                listBlockchain.RemoveAt(ind - 1);
            return Json(listBlockchain);
        }


        public JsonResult MinerarBlockchain(int idList, Block block)
        {
            listBlockchain[idList].Nonce = block.Nonce;
            if (string.IsNullOrEmpty(block.Data)) block.Data = "";
            listBlockchain[idList].Data = block.Data;
            listBlockchain[idList].BlockIndex = block.BlockIndex;
            var bloco = Blockchain.Minerar(listBlockchain[idList]);
            bloco.IsValid = true;
            listBlockchain[idList] = bloco;
            for (int i = 1; i < listBlockchain.Count; i++)
            {
                listBlockchain[i].PreviousHash = listBlockchain[i - 1].Hash;
            }
            return Json(listBlockchain);
        }


        public JsonResult ObterBlockchain()
        {
            return Json(listBlockchain);
        }


        public JsonResult AdicionarBloco()
        {
            var hashAnterior = listBlockchain[listBlockchain.Count - 1].Hash;
            int indice = listBlockchain.Count + 1;
            Block bloco = new Block
            {
                BlockIndex = indice,
                PreviousHash = hashAnterior
            };
            bloco = Blockchain.Minerar(bloco);
            listBlockchain.Add(bloco);
            return Json(listBlockchain);
        }



        public IActionResult Minerar(Block bloco)
        {
            bloco = Blockchain.Minerar(bloco);
            return Json(bloco);
        }


        public IActionResult ObterHash(string texto)
        {
            if (string.IsNullOrEmpty(texto)) texto = "";
            return Json(Blockchain.GerarCodigoHash(texto));
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

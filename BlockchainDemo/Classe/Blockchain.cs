using System;
using System.Diagnostics;
using System.Security.Cryptography;
using System.Text;

namespace BlockchainDemo.Classe
{
    public static class Blockchain
    {
        public static Block Minerar(Block bloco)
        {
            int seq = 1;
            bool validou = false;
            TimeSpan tempoDecorrido;

            var timer = new Stopwatch();
            timer.Start();
            while (validou == false)
            {
                bloco.Nonce = seq;
                var hash = GerarHash(bloco);
                if (hash.Substring(0, 4) == "0000")
                {
                    timer.Stop();
                    tempoDecorrido = timer.Elapsed;
                    bloco.TimeSpent = tempoDecorrido.ToString(@"m\:ss\.fff");
                    bloco.Hash = hash;
                    validou = true;
                }
                else
                {
                    seq++;
                }
            }
            return bloco;
        }


        public static string GerarHash(Block block)
        {
            try
            {
                var texto = $"{block.BlockIndex.ToString()}{block.Nonce.ToString()}{block.Data}";
                var result = GerarCodigoHash(texto);
                return result;
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public static string GerarCodigoHash(string texto)
        {
            if (string.IsNullOrWhiteSpace(texto)) texto = "";
            using (SHA256 sha256 = SHA256.Create())
            {
                var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(texto));
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }




    }
}


using System.Linq;
using System.Threading.Tasks;
using Amz.Core;
using Amz.Core.Entities;
using Amz.Core.Handlers.ToDoItems;
using Amz.SharedKernel.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Amz.Web.Controllers
{
    public class ToDoController : Controller
    {
        private readonly IRepository _repository;

        public ToDoController(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<IActionResult> Index()
        {
            var items = (await _repository.ListAsync<ToDoItem>())
                            .Select(ToDoItemDto.FromToDoItem);
            return View(items);
        }

        public IActionResult Populate()
        {
            int recordsAdded = DatabasePopulator.PopulateDatabase(_repository);
            return Ok(recordsAdded);
        }
    }
}

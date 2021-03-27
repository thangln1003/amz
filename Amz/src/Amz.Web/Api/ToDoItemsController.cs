using System.Threading.Tasks;
using Amz.Core.Handlers.ToDoItems.Commands;
using Amz.Core.Handlers.ToDoItems.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Amz.Web.Api
{
    public class ToDoItemsController : BaseApiController
    {
        private readonly IMediator _mediator;

        public ToDoItemsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        // GET: api/ToDoItems
        [HttpGet]
        public async Task<IActionResult> List()
        {
            var items = await _mediator.Send(new GetToDoItemsQuery());

            return Ok(items);
        }

        // GET: api/ToDoItems
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            var item = await _mediator.Send(new GetToDoItemQuery {Id = id});

            return Ok(item);
        }

        // POST: api/ToDoItems
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewToDoItemRequest item)
        {
            var result = await _mediator.Send(item);

            return Ok(result);
        }

        [HttpPatch("{id:int}/complete")]
        public async Task<IActionResult> Complete(int id)
        {
            var result = await _mediator.Send(new CompleteToDoItemRequest {Id = id});

            return Ok(result);
        }
    }
}

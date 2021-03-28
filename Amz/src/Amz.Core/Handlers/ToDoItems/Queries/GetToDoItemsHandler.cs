using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Amz.Core.Entities;
using Amz.SharedKernel.Interfaces;
using MediatR;

namespace Amz.Core.Handlers.ToDoItems.Queries
{
    public class GetToDoItemsQuery : IRequest<ToDoItemsVm>
    {
    }

    public class GetToDoItemsHandler : IRequestHandler<GetToDoItemsQuery, ToDoItemsVm>
    {
        private readonly IRepository _repository;

        public GetToDoItemsHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<ToDoItemsVm> Handle(GetToDoItemsQuery request, CancellationToken cancellationToken)
        {
            return new()
            {
                Data = (await _repository.ListAsync<ToDoItem>()).Select(s => new ToDoItemDto
                {
                    Id = s.Id,
                    Description = s.Description,
                    IsDone = s.IsDone,
                    Title = s.Title
                }).ToList()
            };
        }
    }
}

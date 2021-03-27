using System.Threading;
using System.Threading.Tasks;
using Amz.Core.Entities;
using Amz.SharedKernel.Interfaces;
using MediatR;

namespace Amz.Core.Handlers.ToDoItems.Queries
{
    public class GetToDoItemQuery : IRequest<ToDoItemDto>
    {
        public int Id { get; set; }
    }

    public class GetToDoItemByIdHandler : IRequestHandler<GetToDoItemQuery, ToDoItemDto>
    {
        private readonly IRepository _repository;

        public GetToDoItemByIdHandler(IRepository repository)
        {
            _repository = repository;
        }

        public async Task<ToDoItemDto> Handle(GetToDoItemQuery request, CancellationToken cancellationToken)
        {
            var item = await _repository.GetByIdAsync<ToDoItem>(request.Id);

            return new ToDoItemDto
            {
                Id = item.Id,
                Description = item.Description,
                IsDone = item.IsDone,
                Title = item.Title
            };
        }
    }
}

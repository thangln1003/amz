using Microsoft.AspNetCore.Mvc;

namespace Amz.Web.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public abstract class BaseApiController : Controller
    {
    }
}

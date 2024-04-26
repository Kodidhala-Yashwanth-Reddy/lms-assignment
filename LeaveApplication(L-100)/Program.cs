

using LeaveApplication_L_100_.Model;
using Microsoft.EntityFrameworkCore;

namespace LeaveApplication_L_100_
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.AddDbContext<LeaveContext>(options =>
            {
                options.UseSqlServer("Server=DESKTOP-H3HA538;Database=LeaveApplication(L-100);Trusted_Connection=True;TrustServerCertificate=True;");
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCors(x => x
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());

            app.MapControllers();

            app.Run();
        }
    }
}

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using POS.Interface;
using POS.Models;
using POS.MyMethods;
using System.Configuration;
using System.Text;
using POS.Controllers;





//  <<<<<<<<<<<<<<<< Step # 1(To Enable Cors) >>>>>>>>>>>>>>>>   
 var MyCorsName = "_myAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

//  <<<<<<<<<<<<<<<< Step # 2(To Enable Cors) >>>>>>>>>>>>>>>>    
builder.Services.AddCors(options =>
{
    options.AddPolicy(name : MyCorsName, policy =>
                      {
                          policy.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();

                      });
});





// Jwt Authentication (Step 1) With out Expirey Token

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//        .AddJwtBearer(options => {
//            options.TokenValidationParameters = new TokenValidationParameters
//            {
//                ValidateIssuer = true,
//                ValidateAudience = true,
//                ValidateLifetime = true,
//                ValidateIssuerSigningKey = true,
//                ValidIssuer = builder.Configuration["Jwt:Issuer"],
//                ValidAudience = builder.Configuration["Jwt:Audience"],
//                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
//            };
//        });




//Jwt Authentication (Step 2) With Expirey Token

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = false;
    x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddMvc();
builder.Services.AddControllers();
builder.Services.AddRazorPages();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

//For Bearer Token in Swagger API Testing
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(sw => sw.SwaggerDoc("v1",new OpenApiInfo { Title = "PointOfSale", Version = "1.0" }));
builder.Services.AddSwaggerGen(s => s.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
{
    In = ParameterLocation.Header,
    Description = "Insert Token",
    Name = "Authorization",
    Type = SecuritySchemeType.Http,
    BearerFormat ="JWT",
    Scheme = "bearer"
}));
builder.Services.AddSwaggerGen(w => w.AddSecurityRequirement(new OpenApiSecurityRequirement 
{
    { new OpenApiSecurityScheme 
        {
            Reference = new OpenApiReference
            {
                Type = ReferenceType.SecurityScheme,
                Id="Bearer"
            }
         },
         new string[]{ }
    } 
}));


 
//Middleware for Code First Approach
builder.Services.AddDbContext<db_POS>(x => x.UseSqlServer(builder.Configuration.GetConnectionString("cs_POS")));
builder.Services.AddTransient<IRepository<tbl_user>, Repository<tbl_user>>();
builder.Services.AddTransient<IRepository<tbl_role>, Repository<tbl_role>>();
builder.Services.AddTransient<IRepository<tbl_store>, Repository<tbl_store>>();
builder.Services.AddTransient<IRepository<tbl_product>, Repository<tbl_product>>();
builder.Services.AddTransient<IRepository<tbl_category>, Repository<tbl_category>>();
builder.Services.AddTransient<IRepository<tbl_record>, Repository<tbl_record>>();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseStaticFiles();   

//  <<<<<<<<<<<<<<<< Step # 3(To Enable Cors) >>>>>>>>>>>>>>>>
app.UseCors(MyCorsName);
 
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();   

 

app.Run();











using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Libary_asm.Models;
using Microsoft.EntityFrameworkCore;

namespace Libary_asm
{
    public class LibaryContext : DbContext
    {

        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<BorrowRequest> BorrowRequests { get; set; }

        public DbSet<BorrowDetail> BorrowDetails { get; set; }

        public LibaryContext()
        {
            
        }

        public LibaryContext(DbContextOptions<LibaryContext> options) : base(options)
        {

        }



        // protected override void OnConfiguring(DbContextOptionsBuilder options)
        // {
        //     if(!options.IsConfigured)
        //     {
        //          options.UseSqlServer("Server = CHINHTKT\\SQLEXPRESS; database = libarynashtech ; Trusted_Connection= True");

        //     }
        // }
        

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>().HasKey(s => s.BookId);
            modelBuilder.Entity<Category>().HasKey(s => s.CategoryId);
            modelBuilder.Entity<User>().HasKey(s => s.UserId);
            modelBuilder.Entity<BorrowRequest>().HasKey(s => s.BorrowRequestId);
            modelBuilder.Entity<BorrowDetail>().HasKey(s => new { s.BookId, s.BorrowRequestId });

            modelBuilder.Entity<Book>()
                .HasOne(s => s.Category)
                .WithMany(s => s.Books)
                .HasForeignKey(s => s.CategoryId);
            modelBuilder.Entity<BorrowRequest>()
                .HasOne(s => s.User)
                .WithMany(s => s.BorrowRequests)
                .HasForeignKey(s => s.UserId);

            modelBuilder.Entity<BorrowDetail>()
            .HasOne(s => s.Book)
            .WithMany(s => s.BorrowDetails)
            .HasForeignKey(s => s.BookId)
            .IsRequired();

            modelBuilder.Entity<BorrowDetail>()
            .HasOne(s => s.BorrowRequest)
            .WithMany(s => s.BorrowDetails)
            .HasForeignKey(s => s.BorrowRequestId)
            .IsRequired();

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(new User{UserId=1 , Username="chinhtkt", Password="123"});

            modelBuilder.Entity<Category>().HasData(new Category{CategoryId= 1, Name="Test2"});

            modelBuilder.Entity<Book>().HasData(new Book {BookId = 1, Name="MCK o Circle K1 ", Author="Son tung m-tp 1", CategoryId=1});
            modelBuilder.Entity<Book>().HasData(new Book {BookId = 2, Name="MCK o Circle K2", Author="Son tung m-tp 2", CategoryId=1});
            modelBuilder.Entity<Book>().HasData(new Book {BookId = 3, Name="MCK o Circle K3", Author="Son tung m-tp 3", CategoryId=1});
            modelBuilder.Entity<Book>().HasData(new Book {BookId = 4, Name="MCK o Circle K4", Author="Son tung m-tp 4", CategoryId=1});

        }

        internal object Get(int borrowRequestId)
        {
            throw new NotImplementedException();
        }
    }




}
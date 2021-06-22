<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;
using Newtonsoft.Json; //להוסיף את הNewtonsoft
using System.Data;
using System.Data.OleDb;
using System.Collections.Generic;

public class Handler : IHttpHandler
{
    SQLClass mySql = new SQLClass();

    public void ProcessRequest(HttpContext context)
    {
        context.Response.ContentType = "text/plain";

        //קבלת הפעולה שאותה אנחנו רוצים לעשות - ניתן כמובן להחליט על שמות הפעולות
        string Action = context.Request["Action"]; // חשוב לשים לב שזה אותו שם משתנה כמו בקובץ הJS
        string email = context.Request["email"];
        string password = context.Request["password"];

        switch (Action)
        {
            //הצגת כל המתשמשים
            case "getAllUsers":

                //שאילתה לשליפת כל היוזרים
                string myQueryAllUsers = "SELECT * FROM DB where email='"+email+"' AND password ='"+password+"'";

                //שליפה באמצעות פנייה למחלקה
                DataSet myUsers = mySql.SQLSelect(myQueryAllUsers);

                //אם יש יוזרים
                if (myUsers.Tables[0].Rows.Count != 0)
                {
                    //המרת הטבלה שחזרה מהשליפה לג'ייסון
                    string jsonUsersText = JsonConvert.SerializeObject(myUsers);

                    context.Response.Write(jsonUsersText);
                }
                else
                {
                    context.Response.Write("");
                    //context.Response.Write("noUsers");
                }
                break;

            //רישום משתמש חדש
            case "registerNewUser":

                //קבלת כל הפרטים שנשלחו מהקריאה
                string newUsername = context.Request["username"];
                string fisrtName = context.Request["fisrtName"];
                string lastName = context.Request["lastName"];

                //אם קיים תוכן בכל אחד מהפרטים
                if (newUsername != null && fisrtName != null && lastName != null)
                {
                    //שאילתה להוספת היוזר החדש לטבלת היוזרים
                    string myQueryAddUser = "INSERT INTO users (Username, FirstName, LastName) VALUES ('" + newUsername + "', '" + fisrtName + "', '" + lastName + "')";

                    //הוספה לטבלה באמצעות המחלקה
                    mySql.SQLChange(myQueryAddUser);

                    context.Response.Write("actionSucceed");
                }
                else
                {
                    context.Response.Write("noData");
                }

                break;

            //הצגת כל המשחקים של יוזר מסוים
            case "UserGames":

                //קבלת שם המשתמש שנשלח מהקריאה
                string gamesUsername = context.Request["username"];

                //שאילתה לשליפת כל שמות המשחקים של יוזר ששם המשתמש שלו הוא מה שנשלח
                string myQueryUserGames = "SELECT games.* FROM games, users WHERE games.userID = users.ID AND users.Username = '" + gamesUsername + "'";

                //שליפה באמצעות פנייה למחלקה
                DataSet userGames = mySql.SQLSelect(myQueryUserGames);

                //אם יש משחקים
                if (userGames.Tables[0].Rows.Count != 0)
                {
                    //המרת הטבלה שחזרה מהשליפה לג'ייסון
                    string jsonGamesText = JsonConvert.SerializeObject(userGames);

                    context.Response.Write(jsonGamesText);
                }
                else
                {
                    context.Response.Write("noGamesFound");
                }
                break;

        }

    }

    public bool IsReusable
    {
        get
        {
            return true;
        }
    }
}

















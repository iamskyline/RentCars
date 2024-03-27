using Npgsql;

namespace RentCars.Tools.DataBase;

public interface IMainConnector
{
    T? Get<T>(String expression, params NpgsqlParameter[] parameters);

    List<T> GetList<T>(String expression, params NpgsqlParameter[] parameters);

    void Add(String expression, params NpgsqlParameter[] parameters);

    void ExecuteNonQuery(String expression, params NpgsqlParameter[] parameters);
}
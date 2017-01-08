package com.smartglossa.arun;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class BillClass {
	Connection con = null;
	Statement stat = null;
	ResultSet res = null;

	public BillClass() throws Exception {
		openConnection();
	}

	public void addbill(String billno, int salesamt, int paid, int prple, int credit, int shortt, int ex, String date,
			int tot) throws SQLException {
		try {
			String query = "insert into bill(billno,sales,paid,prin,credit,shortt,ex,dates,cdate,tot)values('" + billno
					+ "'," + salesamt + "," + paid + "," + prple + "," + credit + "," + shortt + "," + ex + ",'" + date
					+ "',now()," + tot + ")";
			stat.execute(query);
		} finally {
			closeConnection();
		}
	}

	public void updatebill(String billno, int salesamt, int paid, int prple, int credit, int shortt, int ex,
			String date, int tot) throws SQLException {
		try {
			String querys = "select * from bill where billno=" + billno;
			ResultSet rs = stat.executeQuery(querys);
			if (rs == null) {
				return;
			}
			if (rs.next()) {
				String bilno = rs.getString(1);
				int sal = rs.getInt(2);
				int paids = rs.getInt(3);
				int prins = rs.getInt(4);
				int cred = rs.getInt(5);
				int shor = rs.getInt(6);
				int exs = rs.getInt(7);
				String dates = rs.getString(8);
				String cdate = rs.getString(9);
				int tots = rs.getInt(10);
				try {
					String query = "insert into oldbill(billno,sales,paid,prin,credit,shortt,ex,dates,cdate,tot)values('"
							+ bilno + "'," + sal + "," + paids + "," + prins + "," + cred + "," + shor + "," + exs
							+ ",'" + dates + "','" + cdate + "'," + tots + ")";
					stat.executeUpdate(query);
					String query2 = "update bill set sales=" + salesamt + ",paid=" + paid + ",prin=" + prple
							+ ",credit=" + credit + ",shortt=" + shortt + ",ex=" + ex + ",dates='" + date
							+ "' where billno='" + billno + "'";
					stat.execute(query2);
				} catch (Exception e) {
				}
			}
		} finally {
			closeConnection();
		}
	}

	public JSONObject getbill(String billno) throws JSONException, SQLException {
		JSONObject one = new JSONObject();
		try {
			String query = "select * from bill where billno='" + billno + "'";
			ResultSet rs = stat.executeQuery(query);
			if (rs.next()) {

				one.put("billNO", rs.getString(1));
				one.put("sales", rs.getInt(2));
				one.put("paid", rs.getInt(3));
				one.put("prin", rs.getInt(4));
				one.put("credit", rs.getInt(5));
				one.put("shortage", rs.getInt(6));
				one.put("Excess", rs.getInt(7));
				one.put("date", rs.getString(8));
				one.put("tot", rs.getInt(9));

			}
		} finally {
			closeConnection();
		}
		return one;

	}

	public JSONArray getAllbill() throws SQLException {
		JSONArray obj = new JSONArray();
		try {
			String query = "select * from bill";
			ResultSet res = stat.executeQuery(query);
			while (res.next()) {
				JSONObject getall = new JSONObject();
				getall.put("billNO", res.getString(1));
				getall.put("sales", res.getInt(2));
				getall.put("paid", res.getInt(3));
				getall.put("prin", res.getInt(4));
				getall.put("credit", res.getInt(5));
				getall.put("shortage", res.getInt(6));
				getall.put("Excess", res.getInt(7));
				getall.put("date", res.getString(8));
				obj.put(getall);

			}
		} finally {
			closeConnection();

		}
		return obj;
	}

	public void deletebill(String billno) throws SQLException {
		try {
			String query = "delete from bill where billno='" + billno + "'";
			stat.execute(query);
		} finally {
			closeConnection();

		}
	}

	public void adduser(String name, String user, String pass) throws SQLException {
		try {
			String query = "insert into reg(name,user,password)values('" + name + "','" + user + "','" + pass + "')";
			stat.execute(query);
		} finally {
			closeConnection();
		}
	}

	public JSONObject loginbill(String user, String pass) throws SQLException {
		JSONObject log = new JSONObject();
		try {
			String query = "select user from reg where user='" + user + "' AND password='" + pass + "'";
			ResultSet rs = stat.executeQuery(query);
			if (rs.next()) {
				if (user != "") {
					log.put("username", rs.getString(1));
					log.put("status", "success");
				}
			} else {
				log.put("status", "error");

			}

		} finally {
			closeConnection();
		}
		return log;

	}

	public JSONArray total() throws SQLException {
		JSONArray val = new JSONArray();
		try {
			String query = "select sum(sales),sum(paid),sum(prin),sum(credit),sum(shortt),sum(ex) from bill";
			ResultSet rs = stat.executeQuery(query);
			if (rs.next()) {
				JSONObject tot = new JSONObject();
				tot.put("sales", rs.getString(1));
				tot.put("paid", rs.getString(2));
				tot.put("prin", rs.getString(3));
				tot.put("credit", rs.getString(4));
				tot.put("shortage", rs.getString(5));
				tot.put("excess", rs.getString(6));
				val.put(tot);

			}
		} finally {
			closeConnection();
		}
		return val;
	}
  public JSONArray listbill() throws SQLException{
	  JSONArray list=new JSONArray();
	  try {
		  String qry = "select sum(sales),sum(paid),sum(prin),sum(credit),sum(shortt),sum(ex) from bill";
			ResultSet res = stat.executeQuery(qry);
			if (res.next()) {
				JSONObject tots = new JSONObject();
				tots.put("sales", res.getString(1));
				tots.put("paid", res.getString(2));
				tots.put("prin", res.getString(3));
				tots.put("credit", res.getString(4));
				int shotage = res.getInt(5);
				int exx = res.getInt(6);
				int sh = 0;
				int exs = 0;
				sh = shotage - exx;
				exs = exx - shotage;
				if (exs < sh) {
					tots.put("Shortage", sh);
				} else {
					tots.put("Excess", exs);
				}
				list.put(tots);
			}
	} finally {
		closeConnection();
	}
	return list;
  }
	private void openConnection() throws Exception {
		Class.forName(BillConstant.MYSQL_DRIVER);
		// String URL = "jdbc:mysql://" + BillConstant.MYSQL_SERVER + "/" +
		// BillConstant.DATABASE_NAME;
		String URL = "jdbc:mysql://localhost:3306/arun";
		con = DriverManager.getConnection(URL, BillConstant.USERNAME, BillConstant.PASSWORD);
		stat = con.createStatement();

	}

	private void closeConnection() throws SQLException {
		if (con != null) {
			con.close();

		}
		if (stat != null) {
			stat.close();
		}
		if (res != null) {
			res.close();
		}

	}
}

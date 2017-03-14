package com.smartglossa.arun;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

public class BillServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		JSONObject bill = new JSONObject();
		String URL = "jdbc:mysql://" + BillConstant.MYSQL_SERVER + "/" + BillConstant.DATABASE_NAME;
		// String URL = "jdbc:mysql://localhost:3306/arun";
		String operation = request.getParameter("operation");

		if (operation.equals("add")) {
			String billno = request.getParameter("abillno");
			int salesamt = Integer.parseInt(request.getParameter("asales"));
			int paid = Integer.parseInt(request.getParameter("apaid"));
			int prple = Integer.parseInt(request.getParameter("aprinciple"));
			String date = request.getParameter("date");
			int credit = 0;
			credit = salesamt - paid;
			int shortt = 0;
			int ex = 0;
			int tot = 0;
			if (prple > paid) {
				shortt = prple - paid;
			} else {
				ex = paid - prple;
			}
			if (shortt > ex) {
				tot = shortt - ex;
			} else {
				tot = ex - shortt;
			}

			try {
				BillClass addbill = new BillClass();
				Cookie[] cookies = request.getCookies();
				if (cookies != null) {
					for (int i = 0; i < cookies.length; i++) {
						Cookie cookie = cookies[i];
						// String cookieName = cookie.getName();
						String cookieId = cookies[i].getValue();
						addbill.addbill(billno, salesamt, paid, prple, credit, shortt, ex, date, tot, cookieId);
					}
				}
				bill.put("status", 1);
			} catch (Exception e) {
				bill.put("status", 0);
				bill.put("message", e.getMessage());
				e.printStackTrace();
			}
			response.getWriter().print(bill);
		} else if (operation.equals("update")) {
			JSONObject update = new JSONObject();
			String billno = request.getParameter("abillno");
			int salesamt = Integer.parseInt(request.getParameter("asales"));
			int paid = Integer.parseInt(request.getParameter("apaid"));
			int prple = Integer.parseInt(request.getParameter("aprinciple"));
			String date = request.getParameter("date");
			int credit = 0;
			int shortt = 0;
			int ex = 0;
			int tot = 0;
			credit = salesamt - paid;
			if (prple > paid) {

				shortt = prple - paid;
			} else {
				ex = prple - paid;
			}
			if (shortt > ex) {
				tot = shortt - ex;
			} else {
				tot = ex - shortt;
			}
			try {
				BillClass updatebill = new BillClass();
				
						updatebill.updatebill(billno, salesamt, paid, prple, credit, shortt, ex, date, tot);
					
				update.put("status", 1);

			} catch (Exception e) {
				update.put("status", 0);
				e.printStackTrace();
				update.put("message", e.getMessage());
			}
			response.getWriter().print(update);
		} else if (operation.equals("getOne")) {
			JSONObject one = new JSONObject();
			String billno = request.getParameter("abillno");
			try {
				BillClass gone = new BillClass();
				Cookie[] cookies = request.getCookies();
				if (cookies != null) {
					for (int i = 0; i < cookies.length; i++) {
						Cookie cookie = cookies[i];
						// String cookieName = cookie.getName();
						String cookieId = cookies[i].getValue();
						one = gone.getbill(billno, cookieId);
					}
				}
			} catch (Exception e) {
				one.put("status", 0);
				e.printStackTrace();
			}
			response.getWriter().print(one);
		} else if (operation.equals("getall")) {
			JSONArray all = new JSONArray();
			try {
				BillClass getall = new BillClass();
				Cookie[] cookies = request.getCookies();
				if (cookies != null) {
					for (int i = 0; i < cookies.length; i++) {
						Cookie cookie = cookies[i];
						// String cookieName = cookie.getName();
						String cookieId = cookies[i].getValue();
				all = getall.getAllbill(cookieId);
					}
				}
			} catch (Exception e) {
				JSONObject error = new JSONObject();
				error.put("status", 0);
				all.put(error);
				e.printStackTrace();
			}
			response.getWriter().print(all);
		} else if (operation.equals("delete")) {
			JSONObject del = new JSONObject();
			String billno = request.getParameter("abillno");
			try {
				BillClass deletebill = new BillClass();
				Cookie[] cookies = request.getCookies();
				if (cookies != null) {
					for (int i = 0; i < cookies.length; i++) {
						Cookie cookie = cookies[i];
						// String cookieName = cookie.getName();
						String cookieId = cookies[i].getValue();
					
				deletebill.deletebill(billno,cookieId);
					}
				}
				del.put("status", 1);
			} catch (Exception e) {
				del.put("status", 0);
				e.printStackTrace();
				del.put("message", e.getMessage());
			}
			response.getWriter().print(del);
		} else if (operation.equals("adduser")) {
			JSONObject us = new JSONObject();
			String name = request.getParameter("name");
			String user = request.getParameter("username");
			String pass = request.getParameter("password");
			Random rand = new Random();
			int ran = rand.nextInt(500000000);
			try {
				BillClass adduser = new BillClass();
				adduser.adduser(name, user, pass, ran);
				us.put("status", 1);

			} catch (Exception e) {
				us.put("status", 0);
				e.printStackTrace();
				us.put("message", e.getMessage());
			}
			response.getWriter().print(us);

		} else if (operation.equals("login")) {
			JSONObject log = new JSONObject();
			String user = request.getParameter("user");
			String pass = request.getParameter("pass");
			try {
				BillClass login = new BillClass();
				log = login.loginbill(user, pass);

			} catch (Exception e) {
				log.put("status", 0);
				e.printStackTrace();
			}
			response.getWriter().print(log);
		} else if (operation.equals("total")) {
			JSONArray val = new JSONArray();
			try {
				BillClass totalbill = new BillClass();
				val = totalbill.total();
			} catch (Exception e) {
				JSONObject error = new JSONObject();
				error.put("status", 0);
				e.printStackTrace();
				val.put(error);
			}
			response.getWriter().print(val);
		} else if (operation.equals("totlist")) {
			JSONArray list = new JSONArray();
			try {
				BillClass listbill = new BillClass();
				Cookie[] cookies = request.getCookies();
				if (cookies != null) {
					for (int i = 0; i < cookies.length; i++) {
						Cookie cookie = cookies[i];
						// String cookieName = cookie.getName();
						String cookieId = cookies[i].getValue();
				list = listbill.listbill( cookieId);
					}
				}
			} catch (Exception e) {
				JSONObject error = new JSONObject();
				list.put(error);
				error.put("status", 0);
				e.printStackTrace();
			}
			response.getWriter().print(list);
		} else if (operation.equals("getusername")) {
			String usname = request.getParameter("users");
			JSONObject usern = new JSONObject();
			try {

				BillClass userlogin = new BillClass();
				usern = userlogin.getuser(usname);
				usern.put("status", 1);
				usern.put("message", usname);
			} catch (Exception e) {
				usern.put("status", 0);
				e.printStackTrace();
				usern.put("message", e.getMessage());

			}
			response.getWriter().print(usern);
		} else if (operation.equals("oldbill")) {
			JSONArray old = new JSONArray();
			try {

				BillClass obill = new BillClass();
				old = obill.oldbilllist();
			} catch (Exception e) {
				JSONObject error = new JSONObject();
				error.put("status", 0);
				old.put(error);
				error.put("message", e.getMessage());
			}
			response.getWriter().print(old);
		} else if (operation.equals("getcedit")) {
			String bno = request.getParameter("billno");
			int pais = Integer.parseInt(request.getParameter("pais"));
			String dat = request.getParameter("dat");
			JSONObject cred = new JSONObject();
			try {

				BillClass obj = new BillClass();
				obj.getcreditbill(bno, pais, dat);
				cred.put("status", 1);
			} catch (Exception e) {
				cred.put("status", 0);
				e.printStackTrace();
				cred.put("Message", e.getMessage());
			}
			response.getWriter().print(cred);
		} else if (operation.equals("getcredits")) {
			String bno = request.getParameter("bno");
			JSONObject obj = new JSONObject();
			try {
				BillClass cred = new BillClass();

				obj = cred.getcredit(bno);
				obj.put("states", 1);

			} catch (Exception e) {
				obj.put("states", 0);
				e.printStackTrace();
				obj.put("message", e.getMessage());
			}
			response.getWriter().print(obj);
		} else if (operation.equals("days")) {
			JSONArray obj = new JSONArray();
			try {
				Class.forName(BillConstant.MYSQL_DRIVER);
				Connection conn = DriverManager.getConnection(URL, BillConstant.USERNAME, BillConstant.PASSWORD);
				Statement stat = conn.createStatement();
				String query = "select * from ";
				ResultSet rs = stat.executeQuery(query);
				while (rs.next()) {
					JSONObject days = new JSONObject();
					days.put("bnoamt", rs.getString(1));
					days.put("salamt", rs.getInt(2));
					days.put("paidamt", rs.getInt(3));
					days.put("painamt", rs.getInt(4));
					days.put("credamt", rs.getInt(5));
					days.put("storamt", rs.getInt(6));
					days.put("examt", rs.getInt(7));
					obj.put(days);

				}

			} catch (Exception e) {
				JSONObject error = new JSONObject();
				error.put("status", 0);
				e.printStackTrace();
				error.put("message", e.getMessage());
				obj.put(error);

			}
			response.getWriter().print(obj);
		} else if (operation.equals("daybill")) {
			String cdate = request.getParameter("cdate");

			JSONArray objj = new JSONArray();

			try {
				BillClass dd = new BillClass();
				objj = dd.getdate(cdate);
			} catch (Exception e) {
				JSONObject error = new JSONObject();
				error.put("status", 0);
				e.printStackTrace();
				error.put("message", e.getMessage());
				objj.put(error);
			}
			response.getWriter().print(objj);
		} else if (operation.equals("tofromdate")) {
			String fromdate = request.getParameter("from");
			String todate = request.getParameter("to");
			JSONArray tofrom = new JSONArray();
			try {
				// Class.forName(BillConstant.MYSQL_DRIVER);
				// Connection con = DriverManager.getConnection(URL,
				// BillConstant.USERNAME, BillConstant.PASSWORD);
				// Statement stat = con.createStatement();
				// String query = "select * from bill where cdate=" + fromdate +
				// " AND cdate=" + todate + "";
				// ResultSet res = stat.executeQuery(query);
				// while (res.next()) {
				// JSONObject to = new JSONObject();
				// to.put("bnoamt", res.getString(1));
				// to.put("salamt", res.getInt(2));
				// to.put("paidamt", res.getInt(3));
				// to.put("painamt", res.getInt(4));
				// to.put("credamt", res.getInt(5));
				// to.put("storamt", res.getInt(6));
				// to.put("examt", res.getInt(7));
				// tofrom.put(to);

				// }
				BillClass to = new BillClass();
				tofrom = to.fromto(fromdate, todate);
			} catch (Exception e) {
				JSONObject ex = new JSONObject();
				ex.put("status", 0);
				ex.put("message", e.getMessage());
				e.printStackTrace();
				tofrom.put(ex);
			}
			response.getWriter().print(tofrom);
		}

	}
}

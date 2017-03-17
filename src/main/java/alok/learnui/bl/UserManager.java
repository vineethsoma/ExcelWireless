package alok.learnui.bl;

import alok.learnui.dto.CustomerDto;
import alok.learnui.dto.UserDto;
import alok.learnui.dto.UserLogin;
import alok.learnui.util.SQLQueries;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseDataSource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by asp5045 on 1/8/17.
 */

@Component
public class UserManager {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @Autowired
    SQLQueries sqlQuery;

    public UserLogin getUserLoginDetails(String username, String password) {

        List<UserDto> user = new ArrayList<>();

        CustomerDto customerDto = new CustomerDto();

        UserLogin userLogin = new UserLogin();
        boolean response = false;
        try
        {
            customerDto = jdbcTemplate.queryForObject(sqlQuery.getUserDetails, new UserManager.AddUserMapper(),username);

//            for(int i = 0; i<= user.size(); i++)
//            {
//                UserDto u = user.get(i);

            if(null != customerDto)
            {
                if(customerDto.getEmail().equalsIgnoreCase(username) && customerDto.getPassword().equals(password))
                {
                    userLogin.setPhoneNo(customerDto.getPhoneNo());
                    userLogin.setValidUser(true);
                    userLogin.setStreet(customerDto.getStreet());
                    userLogin.setCity(customerDto.getCity());
                    userLogin.setState(customerDto.getState());
                    userLogin.setZipcode(customerDto.getZipcode());
                    userLogin.setCountry(customerDto.getCountry());
                    userLogin.setFax(customerDto.getFax());
                    userLogin.setCompanyName(customerDto.getCompanyName());
                    userLogin.setFirstName(customerDto.getFirstName());
                    userLogin.setLastName(customerDto.getLastName());

                    System.out.println("Send customer information successfully");
                    System.out.println(userLogin.getCompanyName());
                }
                else
                {
                    userLogin.setValidUser(false);
                }
            }
            else
            {
                userLogin.setValidUser(false);
            }

//                if(u.getUsername().equalsIgnoreCase(username) && u.getPassword().equals(password))
//                {
//                    userLogin.setValidUser(true);
//                    userLogin.setUserRole(u.getUserRole());
//                    userLogin.setUserId(u.getUserId());
//                    break;
//                }
//                else
//                {
//                    userLogin.setValidUser(false);
//                    userLogin.setUserRole(null)
        }

        catch (Exception e)
        {
            System.out.println(e);
        }

        return userLogin;
    }

    private static final class AddUserMapper implements RowMapper<CustomerDto>
    {

        @Override
        public CustomerDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            CustomerDto customerDto = new CustomerDto();

            customerDto.setPhoneNo(rs.getString("PHONE_NO"));
            customerDto.setEmail(rs.getString("EMAIL"));
            customerDto.setPassword(rs.getString("PASSWORD"));
            customerDto.setStreet(rs.getString("STREET"));
            customerDto.setCity(rs.getString("CITY"));
            customerDto.setState(rs.getString("STATE"));
            customerDto.setZipcode(rs.getString("ZIPCODE"));
            customerDto.setCountry(rs.getString("COUNTRY"));
            customerDto.setFax(rs.getString("FAX"));
            customerDto.setCompanyName(rs.getString("COMPANY_NAME"));
            customerDto.setFirstName(rs.getString("FIRST_NAME"));
            customerDto.setLastName(rs.getString("LAST_NAME"));

            return customerDto;
        }
    }
}

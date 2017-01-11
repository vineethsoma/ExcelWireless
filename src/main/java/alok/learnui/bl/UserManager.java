package alok.learnui.bl;

import alok.learnui.dto.UserDto;
import alok.learnui.dto.UserLogin;
import alok.learnui.util.SQLQueries;
import org.springframework.beans.factory.annotation.Autowired;
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

        UserLogin userLogin = new UserLogin();
        boolean response = false;
        try
        {
            user = jdbcTemplate.query(sqlQuery.getUserDetails, new UserManager.AddUserMapper());

            for(int i = 0; i<= user.size(); i++)
            {
                UserDto u = user.get(i);

                if(u.getUsername().equalsIgnoreCase(username) && u.getPassword().equals(password))
                {
                    userLogin.setValidUser(true);
                    userLogin.setUserRole(u.getUserRole());
                    userLogin.setUserId(u.getUserId());
                    break;
                }
                else
                {
                    userLogin.setValidUser(false);
                    userLogin.setUserRole(null);
                }
            }
        }
        catch (Exception e)
        {
            System.out.println(e);
        }

        return userLogin;
    }

    private static final class AddUserMapper implements RowMapper<UserDto>
    {

        @Override
        public UserDto mapRow(ResultSet rs, int rowNum) throws SQLException {

            UserDto user = new UserDto();

            user.setUserId(rs.getInt("USER_ID"));
            user.setUsername(rs.getString("USERNAME"));
            user.setPassword(rs.getString("PASSWORD"));
            user.setUserRole(rs.getString("USER_ROLE"));
            user.setHorlyRate(rs.getDouble("HORLYRATE"));
            user.setUserCommissionPercentage(rs.getDouble("USER_COMMISSION_PERCENTAGE"));
            user.setCreatedDate(rs.getString("USER_CREATED_DATE"));

            return user;
        }
    }
}

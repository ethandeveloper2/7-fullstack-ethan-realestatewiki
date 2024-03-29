import pool from "../middlewares/pool.js";
import { getSql } from "../middlewares/console.js";

// 유저 조회 (by 유저 인덱스 번호)
// export function getUserById(id) {
//   const sql = `SELECT user_id, nickname, DATE_FORMAT(datetime_signup, '%Y-%M-%D %H:%i:%s'), email, phone_number, image FROM user WHERE id = ${id}`;
//   getSql(sql);
//   return new Promise((resolve, reject) => {
//     pool.query(sql, function (error, result) {
//       if (error) {
//         return reject("database", `${error.message}`);
//       }
//       resolve(result);
//     });
//   });
// }

export function getUserById(id) {
  const sql = `SELECT user_id, nickname, DATE_FORMAT(datetime_signup, '%Y-%M-%D %H:%i:%s'), email, phone_number, image FROM user WHERE id = ?`;
  getSql(sql);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(sql, id, function (error, result) {
        if (error) {
          return reject("database", `${error.message}`);
        }
        connection.release();
        resolve(result);
      });
    });
  });
}

// 유저 검색 (by 유저 아이디)
export function findByUserid(user_id) {
  const sql = `SELECT id, user_id, user_pw, nickname, DATE_FORMAT(datetime_signup, '%Y-%M-%D %H:%i:%s'), email, phone_number, image FROM user WHERE user_id = ?`;
  getSql(sql);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(sql, user_id, function (error, result) {
        if (error) {
          return reject("database", `${error.message}`);
        }
        connection.release();
        resolve(result);
      });
    });
  });
}

// 회원 가입
export async function makeUser(user, userImage) {
  const sql = `INSERT INTO user(user_id, user_pw, nickname, datetime_signup, email, phone_number, image) VALUES (?,?,?,default,?,?,?)`;
  getSql(sql);
  // query 다양한 예제 보고 할 것
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        sql,
        [
          user.user_id,
          user.user_pw,
          user.nickname,
          user.email,
          user.phone_number,
          userImage,
        ],
        function (error, result) {
          if (error) {
            return reject("database", `${error.message}`);
          }
          connection.release();
          resolve(result);
        }
      );
    });
  });
}

// 유저 정보 수정
export function updateUser(id, user, userImage) {
  const sql = `UPDATE user SET nickname = ?, email= ?, phone_number= ?, image= ? WHERE id = ? `;
  getSql(sql);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        sql,
        [user.nickname, user.email, user.phone_number, userImage, id],
        function (error, result) {
          if (error) {
            return reject("database", `${error.message}`);
          }
          connection.release();
          resolve(result);
        }
      );
    });
  });
}

// 유저 비밀번호 수정
export function updateUserPw(id, new_user_pw) {
  const sql = `UPDATE user SET user_pw = ? WHERE id = ? `;
  getSql(sql);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(sql, [new_user_pw, id], function (error, result) {
        if (error) {
          return reject("database", `${error.message}`);
        }
        connection.release();
        resolve(result);
      });
    });
  });
}

// 유저 이미지 수정
export function updateUserImage(id, image) {
  const sql = `UPDATE user SET image = ? WHERE id = ? `;
  getSql(sql);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(sql, [image, id], function (error, result) {
        if (error) {
          return reject("database", `${error.message}`);
        }
        connection.release();
        resolve(result);
      });
    });
  });
}

// 유저 정보 삭제
export function deleteUser(id) {
  const sql = `delete from user where id= ?`;
  getSql(sql);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(sql, id, function (error, result) {
        if (error) {
          return reject("database", `${error.message}`);
        }
        connection.release();
        resolve(result);
      });
    });
  });
}

// 유저 아이디 중복 여부 확인
export function duplicatescheckUserId(user_id) {
  const checkUserId = `SELECT user_id FROM user WHERE user_id = ?`;
  getSql(checkUserId);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(checkUserId, user_id, function (error, result) {
        if (error) {
          return reject("database", `${error.message}`);
        }
        connection.release();
        resolve(result);
      });
    });
  });
}

// 유저 닉네임 중복 여부 확인
export function duplicatescheckNickname(nickname) {
  const checkNickname = `SELECT nickname FROM user WHERE nickname = ?`;
  getSql(checkNickname);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(checkNickname, nickname, function (error, result) {
        if (error) {
          return reject("database", `${error.message}`);
        }
        connection.release();
        resolve(result);
      });
    });
  });
}

// 유저 이메일 중복 여부 확인
export function duplicatescheckEmail(email) {
  const checkEmail = `SELECT email FROM user WHERE email = ?`;
  getSql(checkEmail);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(checkEmail, email, function (error, result) {
        if (error) {
          return reject("database", `${error.message}`);
        }
        connection.release();
        resolve(result);
      });
    });
  });
}

// 유저 핸드폰번호 중복 여부 확인
export function duplicatescheckPhoneNumber(phone_number) {
  const checkPhoneNumber = `SELECT phone_number FROM user WHERE phone_number = ?`;
  getSql(checkPhoneNumber);
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        checkPhoneNumber,
        phone_number,
        function (error, result) {
          if (error) {
            return reject("database", `${error.message}`);
          }
          connection.release();
          resolve(result);
        }
      );
    });
  });
}

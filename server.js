    <?php  
    // include AES PHP  
    require_once './aes-php.php';    
      
    // array for JSON response    
    $response = array();    
      
    // 1) decryption  
    if (!isset($_POST['cryption'])) { exit; }  
    $result = parseQuery($_POST['cryption']);  
    if (!isset($result)) exit;  
      
    // 2) get data  
    $json_string = $result;  
    $jsonObj = json_decode($json_string);  
    $username = $jsonObj->{'username'};  
    $password = $jsonObj->{'password'};  
    // check for required fields  
    if ($username=="" || $password=="")   
    {  
        // required field is missing    
        $response["success"] = 0;    
        $response["message"] = "Required field(s) is missing";    
      
        // echoing JSON response    
        echo myencrypt(json_encode($response));  
        exit;  
    }  
      
    // 3) connecting to db    
    if (($username == "MarioRossi") && ($password == "79a38d896d90dbfe5e151a326602bc3a"))   
    {  
        // successfully inserted into database    
        $response["success"] = 1;    
        $response["message"] = "Access successfully created.";    
      
        // echoing JSON response    
        echo myencrypt(json_encode($response));    
    }  
    else {  
        // failed to access   
        $response["success"] = 0;    
        $response["message"] = "Oops! An error occurred.";    
      
        // echoing JSON response    
        echo myencrypt(json_encode($response));  
    }  
      
      
    /********************************************************************  
                            IMPLEMENTING FUNCTIONS 
    ********************************************************************/  
      
    /* 
     * Parse json_string 
     */  
    function parseQuery($querystring)   
    {  
        $ciphertext = mysql_real_escape_string(stripslashes($querystring));  
        return mydecrypt($ciphertext);  
    }  
    ?>  
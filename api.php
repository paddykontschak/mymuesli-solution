<?php
    /**
     * source: https://gist.github.com/sepehr/3371339
     */ 
    function readable_random_string($length = 6) {  
        $string     = '';
        $vowels     = array("a","e","i","o","u");  
        $consonants = array(
            'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 
            'n', 'p', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'
        );  

        // Seed it
        srand((double) microtime() * 1000000);

        $max = $length/2;
        for ($i = 1; $i <= $max; $i++)
        {
            $string .= $consonants[rand(0,19)];
            $string .= $vowels[rand(0,4)];
        }

        return $string;
    }

    function readable_random_sentence($length = 10) {
        $string = '';

        for ($i=0; $i < $length; $i++) {
            $string .= readable_random_string() . " ";
        }

        return trim($string);
    }

    $topics = ["HTML Techniques", "CSS Styling", "Flash Tutorials", "Web Miscellanea", "Site News", "Web Development"];
    $authors = ["James", "Judy", "Peter", "Susan", "Timothy", "Darlene", "Willy", "Sandra"];
    $status = ["published", "published", "published", "archived"];
    $types = ["post", "post", "post", "page"];

    $return_arr = array(
        "topics" => [],
        "posts" => []
    );

    foreach ($topics as $key => $value) {
        $return_arr['topics'][] = array (  
            'ID' => $key + 1,
            'title' => $value,
        );
    }

    for ($i=0; $i < rand(40, 327); $i++) {
        $type = $types[array_rand($types)];
        $first_topic = array_rand($topics) + 1;
        $second_topic = array_rand($topics) + 1;
        $selectedTopics = [];

        while ($second_topic === $first_topic) {
            $second_topic = array_rand($topics) + 1;
        }

        if ($type === "post") {
            $selectedTopics = [$first_topic, $second_topic];
        }

        $return_arr['posts'][] = array (  
            "ID" => $i + 1,
            "type" => $type,
            "author" => $authors[array_rand($authors)],
            "date" => date("Y-m-d H:i:s", mt_rand(1, time())),
            "title" => readable_random_string(),
            "excerpt" => readable_random_sentence(),
            "thumbnail" => "placeholder.png",
            "content" => readable_random_sentence(25),
            "slug" => "",
            "url" => "",
            "topics" => $selectedTopics,
            "status" => $status[array_rand($status)]
        );
    }

    echo json_encode($return_arr);
?>
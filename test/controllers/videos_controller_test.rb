require "test_helper"

class VideosControllerTest < ActionDispatch::IntegrationTest
  context 'index' do
    should "get index" do
      get videos_url, as: :json
      assert_response :success
      assert_equal(
        {
          "records" => [
            { "id" => 1, "title" => "thanks for 5 million", "description" => "#shorts", "thumbnail_url" => "https://thumbnail_url.com/1.jpg", "view_count" => 279357 },
            { "id" => 2, "title" => "Game Theory", "description" => "#Game Theory", "thumbnail_url" => "https://thumbnail_url.com/2.jpg", "view_count" => 33565 },
            { "id" => 3, "title" => "EUPHORIA", "description" => "#Game Theory", "thumbnail_url" => "https://thumbnail_url.com/3.jpg", "view_count" => 43456 },
            { "id" => 4, "title" => "Request Accepted!", "description" => "My new request", "thumbnail_url" => "https://thumbnail_url.com/4.jpg", "view_count" => 66456 },
            { "id" => 5, "title" => "EUPHORIA", "description" => "#Game Theory", "thumbnail_url" => "https://thumbnail_url.com/3.jpg", "view_count" => 43456 }
          ],
          "meta" => {
            "total" => 5,
            "total_pages" => 1,
            "current_page" => 1,
            "per_page" => 20
          }
        },
        response.parsed_body
      )
    end

    should "get index with q 'ept'" do
      get videos_url, params: { q: 'ept' }, as: :json
      assert_response :success
      assert_equal(
        {
          "records" => [
            { "id" => 4, "title" => "Request Accepted!", "description" => "My new request", "thumbnail_url" => "https://thumbnail_url.com/4.jpg", "view_count" => 66456 }
          ],
          "meta" => {
            "total" => 1,
            "total_pages" => 1,
            "current_page" => 1,
            "per_page" => 20
          }
        },
        response.parsed_body
      )
    end

    should "get index with q 'ori'" do
      get videos_url, params: { q: 'ori' }, as: :json
      assert_response :success
      assert_equal(
        {
          "records" => [
            { "id" => 3, "title" => "EUPHORIA", "description" => "#Game Theory", "thumbnail_url" => "https://thumbnail_url.com/3.jpg", "view_count" => 43456 },
            { "id" => 5, "title" => "EUPHORIA", "description" => "#Game Theory", "thumbnail_url" => "https://thumbnail_url.com/3.jpg", "view_count" => 43456 }
          ],
          "meta" => {
            "total" => 2,
            "total_pages" => 1,
            "current_page" => 1,
            "per_page" => 20
          }
        },
        response.parsed_body
      )
    end

    should "get index with q 'ori' and page 2" do
      get videos_url, params: { q: 'ori', page: 2 }, as: :json
      assert_response :success
      assert_equal(
        {
          "records" => [],
          "meta" => {
            "total" => 2,
            "total_pages" => 1,
            "current_page" => 2,
            "per_page" => 20
          }
        },
        response.parsed_body
      )
    end
  end
end

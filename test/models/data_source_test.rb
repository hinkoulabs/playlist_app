require "test_helper"

class DataSourceTest < ActiveSupport::TestCase
  context 'validations' do
    should validate_presence_of(:url)
    should validate_uniqueness_of(:url)

    should "be valid if url is correct url (http://localhost:3000)" do
      d = DataSource.new(url: "http://localhost:3000")
      d.valid?
      assert_empty d.errors[:url]
    end

    should "be valid if url is correct url (https://localhost:3000)" do
      d = DataSource.new(url: "https://localhost:3000")
      d.valid?
      assert_empty d.errors[:url]
    end

    should "be valid if url is correct url (http://mock-youtube-api-f3d0c17f0e38.herokuapp.com/api/videos)" do
      d = DataSource.new(url: "http://mock-youtube-api-f3d0c17f0e38.herokuapp.com/api/videos")
      d.valid?
      assert_empty d.errors[:url]
    end

    should "be valid if url is correct url (https://mock-youtube-api-f3d0c17f0e38.herokuapp.com/api/videos)" do
      d = DataSource.new(url: "https://mock-youtube-api-f3d0c17f0e38.herokuapp.com/api/videos")
      d.valid?
      assert_empty d.errors[:url]
    end

    should "be invalid if url is correct url (hfttp://localhost:3000)" do
      d = DataSource.new(url: "hfttp://localhost:3000")
      d.valid?
      assert_equal d.errors[:url], ['is invalid']
    end

    should "be invalid if url is correct url (ftp://localhost:3000)" do
      d = DataSource.new(url: "ftp://localhost:3000")
      d.valid?
      assert_equal d.errors[:url], ['is invalid']
    end

    should "be invalid if url is correct url (http//mock-youtube-api-f3d0c17f0e38.herokuapp.com/api/videos)" do
      d = DataSource.new(url: "http//mock-youtube-api-f3d0c17f0e38.herokuapp.com/api/videos")
      d.valid?
      assert_equal d.errors[:url], ['is invalid']
    end
  end
end

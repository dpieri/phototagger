class SearchSuggestion

  def self.seed
    $redis.flushall
    File.open(Rails.root.join('lib', '350k_words.txt')).each_line do |line|
      text = line.chop.downcase
      length = text.length
      [1, length - 5].max.upto(length) do |n|
        prefix = text[0, n].downcase
        # Scores
        # Exact match = 5
        # 1 letter short = 4
        # 2 letters short = 3
        # etc...
        score = nil
        if prefix == text
          score = 5
        else
          diff = length - n
          score = [1, 5-diff].max
        end
        # puts "adding search-suggestions:#{prefix} : #{text} #{score}"
        $redis.zadd "ss:#{prefix}", score, text
      end
    end
  end

  def self.terms_for(prefix)
    $redis.zrevrange "ss:#{prefix.downcase}", 0, 5
  end

end
